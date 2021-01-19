terraform {
  backend "s3" {
    bucket = "kirbyjs-terraform-statefiles"
    key    = "kirbyjs/fcc/prod.tf"
    region = "us-east-1"
  }

  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "~> 3.24"
    }
  }

  required_version = "~> 0.14"
}

provider "aws" {
  region  = "us-east-1"
}
