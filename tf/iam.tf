data "aws_iam_policy_document" "fcc_kirbjs_bucket_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.fcc_kirbys.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.fcc_kirbyjs.iam_arn]
    }
  }

  statement {
    actions   = ["s3:ListBucket"]
    resources = [aws_s3_bucket.fcc_kirbys.arn]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.fcc_kirbyjs.iam_arn]
    }
  }

  statement {
    effect    = "Deny"
    actions   = ["s3:DeleteBucket"]
    resources = [aws_s3_bucket.fcc_kirbys.arn]

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }
  }
}
