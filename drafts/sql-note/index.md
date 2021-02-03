# [SQL] Note



## 設外鍵
Column type要一樣，若是不同資料庫要確認引擎是否都是InnoDB

```sql
ALTER TABLE `TABLE_NAME_1`
ADD CONSTRAINT `FOREIGN_KEY_NAME` FOREIGN KEY (`COLUMN_NAME `)
REFERENCES `DB_NAME`.`TABLE_NAME_2` (`user_no`);
```

---

## 快速表格備份

```sql
SELECT * INTO BACKUP_TABLE_NAME FROM TABLE_NAME
```

---

## MySQL / Oracle 和 PostgresSQL Index 特性

