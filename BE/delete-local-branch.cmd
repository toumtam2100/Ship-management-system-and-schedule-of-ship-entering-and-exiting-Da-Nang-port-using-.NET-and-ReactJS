--delete all local branch
git branch | grep -v "master" | xargs git branch -D  