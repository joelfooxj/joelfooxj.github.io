---
title: EC2-Ubuntu -  xrdp or TeamViewer  
date: "2021-05-15T19:11:04.535Z"
template: "post"
draft: false
slug: "ec2-xrdp-teamviewer"
category: "sysadmin"
tags:
  - "EC2"
  - "xrdp"
  - "teamviewer"
description: "Comparing xrdp and TeamViewer on EC2 Ubuntu instances"
---
# Motivation 
I wanted to setup an easy GUI way for my colleagues to access our EC2 Ubuntu instances and run openquake compute jobs without having to go through the hassle of learning about ssh, rsync, scp and all the other simple bash commands I take for granted. That necessitated some sort of remote desktop solution, and I considered xrdp and Teamviewer. 

# Which one is better? 
For usage in small teams such as mine, it would have to be Teamviewer, hands down. Teamviewer had lower latency, better video quality, and way better file transfer speeds. That last point was especially important, since we generated large datasets which we needed to transfer back to your local PCs for extensive post-processing. 

Considering an c5.24xlarge instance and a gigabit fibre connection (1Gbps down/ 1Gbps up) on my end, I was getting at most 1MB/s. With Teamviewer, I was able to get close to rsync speeds, at about 5-10 MB/s. Also, obviously, the remote ID doesn't change every time you stop and start an instance, which makes things a lot easier when explaining the setup to your non-IT minded teammates. 

# Teamviewer installation and initialization
Of course, the flipside is that Teamviewer is a little more tedious to setup, especially since an EC2 instance is headless. After some intense googling, I found [this guide by Thilina Madumal](https://thilinamad.medium.com/remote-desktop-to-ubuntu-instance-with-no-gui-f98566adb53e) that was just what was required. If some of the steps below don't make sense, read through the guide! 

I opted to install vanilla lxde instead as my default desktop environment because it was lightweight. Since I had to do this for several instances, I wrote a script that installs and configures (almost) everything starting from a fresh instance. 

1. **Create the xorg.conf file**

	ssh into your instance and then navigate to your home directory with `cd ~` and create a file called `xorg.conf` with the following contents: 
	```bash
	# This xorg configuration file is meant to be used
	# to start a dummy X11 server.
	# For details, please see:
	# https://www.xpra.org/xorg.conf
	 
	# Here we setup a Virtual Display of 1600x900 pixels
	 
	Section "Device"
			Identifier  "Configured Video Device"
			Driver      "dummy"
			#VideoRam 4096000
			#VideoRam 256000
			VideoRam    16384
	EndSection
	 
	Section "Monitor"
			Identifier  "Configured Monitor"
			HorizSync   5.0 - 1000.0
			VertRefresh 5.0 - 200.0
			Modeline "1600x900" 33.92 1600 1632 1760 1792 900 921 924 946
	EndSection
	 
	Section "Screen"
			Identifier  "Default Screen"
			Monitor     "Configured Monitor"
			Device      "Configured Video Device"
			DefaultDepth 24
			SubSection "Display"
					 Viewport 0 0
					 Depth 24
					 Virtual 1920 1080
			EndSubSection
	EndSection
	```
	Note the resolution numbers for the "Display" SubSection. You can change this to whichever suites your needs. I chose standard HD. 

2. **Create the install script**

	In the same directory, create a file called `setup.sh` with the following contents: 
	```bash
	#!/bin/sh

	sudo apt-get update -y
	yes Y | sudo apt-get install lxde
	wget https://download.teamviewer.com/download/linux/teamviewer_amd64.deb
	yes Y | sudo apt install ./teamviewer_amd64.deb
	sudo teamviewer passwd <your password here>
	sudo teamviewer daemon enable
	sudo teamviewer license accept
	sudo apt-get update -y
	yes Y | sudo apt-get install xserver-xorg-video-dummy
	sudo cp xorg.conf /etc/X11/
	```
	Replace \<your password here\> with the remote access password of your choice.
	
3. **Set your instance password**

	The user password for the instance has to be set with `sudo passwd ubuntu`. 

4. **Check your teamviewer ID and reboot**

	Type `teamviewer info` to see the teamviewer ID for this instance then reboot with `sudo reboot`.  

After the instance has rebooted, you should be able to connect to the instance via Teamviewer. On the login screen, enter the password you set for `ubuntu`.Once I was in, I disabled the login screen since access control is already performed with the Teamviewer remote access password, and I didn't want my team to have to remember 2 passwords anyway. 

To see how I setup an EC2 monitoring script that sent notifications to my iPhone, click [here](/posts/ec2-ios-monitoring).

	

