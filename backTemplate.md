---
title: EC2 monitoring with iOS notifications
date: "2021-05-11T20:35:56.693Z"
template: "post"
draft: false
slug: "ec2-ios-monitoring"
category: "sysadmin"
tags:
  - "EC2"
  - "iOS"
description: "Perform simple AWS EC2 monitoring with notifications to iOS devices"
---
I had setup a couple of EC2 instances to execute OQ engine runs. Unfortunately, I could not automate the setup and teardown of each run since each run had its own specific post-processing of data that needed to be done. One gigantic worry I had was that I'd complete all my work on the instance and then just forget to stop it, incurring unnused hours of runtime on a (potentially) expensive instance. For example, if I had forgotten to turn off a x1.32xlarge instance and just let it run overnight, it would've cost 8hrs * \$USD 13 = \$USD 104! A very expensive mistake. 

I wanted a simple reminder pushed to my phone (being high in the order of things that catch and redirect my attention) about whether I had any EC2 instances currently running when they're not supposed to and be promptly shut down. To do this, I set a cron job that called a script every half hour to my AWS account and checked for running EC2 instances. If there were, a notification is sent to my iPhone.  

The following steps assume that you already have an AWS account with EC2 instances running, as well as adequare knowledge of setupin your local python environment.

## Preparing your environment 
1. Download and install the AWS CLI: [Installing, updating, and uninstalling the AWS CLI version 2](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) 
2. Install Python 3.6 or later, and then install the Boto3 library: [Installing the Boto3 library](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/quickstart.html). This library is an official AWS SDK to interact with AWS services via python. 
3. [Install the requests library for python] (https://docs.python-requests.org/en/master/user/install/) 
4. [Install PushCut into your iOS device](https://www.pushcut.io/). We will use this to call webhooks that send push notifications to the iOS device that you've installed it on. 

## Monitoring script
This is the python script that I've used:
```python
import boto3 
import requests as rq

ec2 = boto3.resource('ec2') 
instances = ec2.instances.filter(
    Filters=[{'Name': 'instance-state-name', 'Values': ['running']}])

if len(list(instances)) > 0: 
	# there are instances running 
	rq.get("https://api.pushcut.io/<your secret token goes here>/notifications/<your custom notification name goes here>")
```

The script simply enumerates through the ec2 resources and checks if there are any that are currently running. If there are any running instances, it sends a GET request to the PushCut url as defined in your app. See the [Webhook](https://www.pushcut.io/help#web_api) section in the PushCut help section to get started on defining custom webhooks. 

Save this script somewhere and remember the path to it. 

## Setting up the cron job/task scheduler 
For Linux/MacOS, type the following command into your terminal to set up a cron job: 
```bash 
0,30 * * * * <path to your python program here> <path to your script here>.py 
```
This calls the script every 0th and 30th minute of every hour.

For Windows, follow the instructions [here](https://www.windowscentral.com/how-create-automated-task-using-task-scheduler-windows-10). 


