data "aws_route53_zone" "kirbyjs" {
  name = "kirbyjs.com."
}

data "aws_acm_certificate" "kirbyjs" {
  domain = "kirbyjs.com"
}

resource "aws_route53_record" "fcc_kirbyjs" {
  zone_id = data.aws_route53_zone.kirbyjs.zone_id
  name    = "fcc.kirbyjs.com"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.fcc_kirbyjs.domain_name
    zone_id                = aws_cloudfront_distribution.fcc_kirbyjs.hosted_zone_id
    evaluate_target_health = false
  }
}
