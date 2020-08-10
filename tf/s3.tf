resource "aws_s3_bucket_policy" "fcc_kirbyjs_bucket_policy" {
  bucket = aws_s3_bucket.fcc_kirbys.id
  policy = data.aws_iam_policy_document.fcc_kirbjs_bucket_policy.json
}

resource "aws_s3_bucket" "fcc_kirbys" {
  bucket = "fcc.kirbyjs.com"
  acl    = "private"

  tags = {
    Name = "fcc.kirbyjs.com"
  }
}
