---
layout: post
title: random notes
category: note
---

github 改用 [PTA](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) 之後第一次 push post, 距離上次更新幾乎整整一年 XD

copy vim yank buffer onto command line: ```<CTRL-R>+<">```

應該試著美化 CSS

[建立LINE bot](https://hackmd.io/@TSMI_E7ORNeP8YBbWm-lFA/rJELE-TOG?type=view)

2018-01-06: [第十八天：發布網站到 Heroku ](https://ithelp.ithome.com.tw/articles/10196129)


2012-03-23: [透過 ssh 遠端存取 git repository](https://hexo.crboy.net/2012/03/remote-git-access-via-ssh/)

2013-07-13: [Howto: Git Server over SSH](https://www.systutorials.com/set-up-git-server-through-ssh-connection/)

Git and SSH are both powerful tools, and git/ssh work well together. We introduce how to set up git server via ssh in this post. Git server through SSH is easy and fast to set up, although every user will have access to all repositories in the git server over SSH and every user is the git administrator. This is okay for a small group of git members who trust each other. But for better privilege control, you should try gitolite or gitosis.

If you need to set up a git server for multiple users which may contain contributors and administrator, you may try [[go:gitolite|gitolite]] as recommended by [[set-up-git-server-through-ssh-connection/#comment-46|the gitolite author]]. You may check out [[how-to-set-up-gitolite-git-server-a-ten-minute-tutorial]] for how to set up a git server using gitolite.

If you prefer gitosis, please refer to: [[setting-up-git-server-using-gitosis]] and [[managing-repositories-on-git-server-using-gitosis]]. The gitosis proves quit stable from my experience, although it does not have as many features as gitolite.

In this post how to set up a basic git server and a more complex one (the git server is a server inside of a local area network) will be introduced.
A basic git server through SSH tutorial

Table of Contents

    A basic git server through SSH tutorial
        Server side git user and home
        Add id_rsa.pub to git’s .ssh/authorized_keys
        Create repository
        First commit:
        When programming:
    A more complex git server through SSH tutorial
        Server side git user and home
        Add id_rsa.pub to git’s .ssh/authorized_keys
        Create repository
        First commit:
        When programming:

In this part we will build up a git server through ssh connection. We use ssh to pull or push data from or to git server. The git server can be directly connected. Suppose that we set up git server on machines example.org.
Server side git user and home

logon to the git server by ssh username@example.org. username is the account name that have administrator privilege (or can sudo) on the git server.
Install git package
```
# yum install git
```
Add the user for git
```
# useradd -m -d /home/git -u 1005 git
```
Configure the git user’s shell
```
# vim /etc/passwd
```
Here we assume git’s home directory is /home/git. Then we can change git’s shell from /bin/bash to /usr/bin/git-shell to forbid logging in for a shell for the git account. It can be made by editing /etc/passwd, but this is not suggested. One good method (thanks to victor) is to use the usermod command:
```
# usermod -s /usr/bin/git-shell git
```
However, there may be problem. To make this work, the /usr/bin/git-shell should be put into /etc/shells to avoid “user ‘git’ has invalid shell, rejected” error. (Thanks to Tiago for this)

In addition, COMMAND_DIR (the path “$HOME/git-shell-commands”) must exist and any of the executables in it can be invoked. The user must have read and execute permissions to the directory in order to execute the programs in it. Hence, we should create the COMMAND_DIR in git’s home and give read and execute permission to git:
```
# cd /home/git/
# mkdir git-shell-commands
# chmod 755 git-shell-commands
```
Add id_rsa.pub to git’s .ssh/authorized_keys

log on to git server, using the account that have root or sudo privilege

ssh username@example.org

Copy pub key to a temp directory
```
# cp .ssh/id_rsa.pub /dev/shm/
```
operate in git’s home as root
```
# cd /home/git/.ssh
```
backup before changing is a good habit
```
# cp authorized_keys authorized_keys.bak
```
append pub key to git’s autorized keys list
```
# cat /dev/shm/id_rsa.pub >> authorized_keys
```
Create repository

log on example.org using the account that can edit git’s files.

If you have set the git user account’s shell to git-shell on the git server, you need to add the -s /bin/bash in the su command to use bash as the shell instead of git-shell.

Create the repository directory (as the git user on server)

Initial the repository, –bare means only objects is stored on server (as the git user on server)
```
# su -s /bin/bash - git
$ cd ~
$ mkdir example.git
$ cd ~/example.git
$ git --bare init
```
First commit:

The first commit and push on local machine will create the initial repository.
Initialize the local repository
```
$ mkdir example
$ cd example
$ git init
```
Add a initial empty README file

$ touch README

Add README to the repository

$ git add README

Commit the changes (adding a file)

$ git commit -m 'first commit'

Add the remote git repository address

$ git remote add origin ssh://git@example.org/~/example.git

Push the commit to remote repository

$ git push origin master

When programming:

We need to clone the repository for one time:

$ git clone ssh://git@example.org/~/example.git

Then every time we want to edit some files:

$ cd example
$ git pull  # pull the newest version from the repository

After changing some files:

$ git commit -a -m 'msg'  # commit the changes with a message msg
$ git push # push the changes to the repository

A more complex git server through SSH tutorial

In this part we will build up a git server through ssh connection. We use ssh to pull or push data from or to git server. The git server is inside of a local area network. We use port forwarding to connect to it. Suppose that we set up git server on virtual machines vm111, the gateway server of the net work which vm111 is inside of is gate.example.org, and port 22111 on gate.example.org is port forwarded to vm111:22.
Server side git user and home

logon to the git server by ssh username@gate.example.org -p 22111. username is the account name that can sudo on the git server.

# yum install git
# useradd -m -d /home/git -u 1005 git
# vim /etc/passwd

Then change git’s shell from /bin/bash to /usr/bin/git-shell to forbid logging on for a shell for the git account. And remember to set the /etc/shells file (refer to the “basic git” section above).
Add id_rsa.pub to git’s .ssh/authorized_keys

ssh gate.example.org -p 22111  # log on to vm111, using the account that can sudo
# cp .ssh/id_rsa.pub /dev/shm/    # copy pub key to a temp directory
# su -s /bin/bash - git                        # operate in git's hom
$ cd /home/git/.ssh
$ cp authorized_keys authorized_keys.bak   # backup before changing is a good habit
$ cat /dev/shm/id_rsa.pub >> authorized_keys # append pub key to git's authorized keys list

Create repository

log on gate.example.org -p 22111 # using the account that can sudo

# su -s /bin/bash git
$ cd /home/git
$ mkdir example.git    # the repository directory
$ cd example.git
$ git --bare init      # initial the repository, --bare means only objects is stored on server

First commit:

on local laptop:

$ mkdir example
$ cd example
$ git init
$ touch README
$ git add README
$ git commit -m 'first commit'
$ git remote add origin ssh://git@gate.example.org:22111/~/example.git
$ git push origin master

When programming:

We need to clone the repository for one time:

$ git clone ssh://git@gate.example.org:22111/~/example.git

Then every time we want to edit some files:

$ cd example
$ git pull  # pull the newest version from the repository

After changing some files:

$ git commit -a -m 'msg'  # commit the changes with a message msg
$ git push # push the changes to the repository



// Have Fun!

{% include references.md %}
