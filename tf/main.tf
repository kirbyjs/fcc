terraform {
  backend "s3" {
    bucket = "kirbyjs-terraform-statefiles"
    key    = "kirbyjs/fcc/prod.tf"
    region = "us-east-1"
  }
}

provider "aws" {
  version = "~> 2.0"
  region  = "us-east-1"
}
