# [Git] Note



## 修改 commit 的 name & email

```bash
git commit --amend --author="Author Name <email@address.com>"
```

---

## 批次將 CRLF 修改為 LF

```bash
# Remove everything from the index
git rm --cached -r .

# Re-add all the deleted files to the index
# You should get lots of messages like:
# "warning: CRLF will be replaced by LF in <file>."
git diff --cached --name-only -z | xargs -0 git add

# Commit
git commit -m "Fix CRLF"
```

reference :

* [git-diff to ignore ^M](https://stackoverflow.com/questions/1889559/git-diff-to-ignore-m/1889699#1889699)

---

