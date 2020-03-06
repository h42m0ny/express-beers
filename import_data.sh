#!/bin/bash

FILES=$(find ./app/beers -type f -name "*.json")
host=$1
username=$2
pwd=$3
auth_db=$4
db_name=$5

for file in $FILES
do
    if [ $file != "beers.json" ]
    then
        echo $file
         mongoimport  --host  $host --port 27017 --username=$username --password=$pwd --authenticationDatabase=$auth_db --db $db_name --collection beers --file $file
    fi
done
echo "data imported"
