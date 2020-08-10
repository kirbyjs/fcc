locals {
  fcc_s3_origin_id        = "fcc-kirbyjs-bucket"
  default_allowed_methods = ["GET", "HEAD", "OPTIONS"]
  default_cached_methods  = ["GET", "HEAD", "OPTIONS"]
  default_ttl             = 2592000
  max_ttl                 = 31536000
  min_ttl                 = 0
}

data "aws_lambda_function" "cloudfront_default_directory_index" {
  function_name = "CloudfrontDefaultDirectoryIndex"
}

resource "aws_cloudfront_origin_access_identity" "fcc_kirbyjs" {
  comment = "fcc.kirbyjs.com default oai"
}

resource "aws_cloudfront_distribution" "fcc_kirbyjs" {
  origin {
    domain_name = aws_s3_bucket.fcc_kirbys.bucket_regional_domain_name
    origin_id   = local.fcc_s3_origin_id

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.fcc_kirbyjs.cloudfront_access_identity_path
    }
  }

  aliases             = ["fcc.kirbyjs.com"]
  enabled             = true
  is_ipv6_enabled     = true
  price_class         = "PriceClass_100"
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods        = local.default_allowed_methods
    cached_methods         = local.default_cached_methods
    compress               = true
    target_origin_id       = local.fcc_s3_origin_id
    viewer_protocol_policy = "redirect-to-https"
    default_ttl            = local.default_ttl
    max_ttl                = local.max_ttl
    min_ttl                = local.min_ttl

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    lambda_function_association {
      event_type = "origin-request"
      lambda_arn = "${data.aws_lambda_function.cloudfront_default_directory_index.arn}:3"
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = data.aws_acm_certificate.kirbyjs.arn
    minimum_protocol_version = "TLSv1.1_2016"
    ssl_support_method       = "sni-only"
  }
}
