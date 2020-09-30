#!/usr/bin/env bash

# Source colour utility script
eval "$(curl -s -L https://gist.githubusercontent.com/nathandaly/577ed2e32a5682372a95a5bcb94e5135/raw/7dceac6d4e4694d3f47ecf35212d5890c6d562d1/colours.sh)"

# Database credentials
staging_user="USER"
staging_password="SECRET"
staging_host="staginghost"

local_user="root"
local_password="test"
local_host="localhost"

db_name="mallcomm_cms"
sql_file_name=$db_name
backup_path="./tmp"
db_container="dev_db"
save_export=false
export_success=false
skip_export=false
today=`date +%Y-%m-%d`

function buildAndRunContainers {
    echo ${LBLUE}"== Building images and running containers ..."${RESTORE}
    if [[ "$(docker images -q php:7.2-fpm 2> /dev/null)" == "" ]]; then
      docker-compose build
    fi

    docker-compose up -d
}

function createTmpStorage {
    printf "\n"
    while true; do
        read -p ${LBLUE}"Do you want to import an existing SQL file? [y/n]: "${RESTORE} yn
        case $yn in
            [Yy]* ) skip_export=true; break;;
            [Nn]* ) break;;
            * ) echo ${LRED}"Please answer yes or no."${RESTORE};;
        esac
    done

    if [ "$skip_export" = true ] ; then
        printf "\n"
        read -p ${LBLUE}"Absolute path to SQL file (excluding seperator) [${backup_path}]: "${RESTORE} backup_path_input
        backup_path="${backup_path_input:-$backup_path}"
        read -p ${LBLUE}"SQL file name [${sql_file_name}]: "${RESTORE} sql_file_name_input
        sql_file_name="${sql_file_name_input:-$db_name}"
        printf "\n";

        if [ ! -f $backup_path/$sql_file_name.sql ] ; then
            echo ${LRED}"File not found!"${RESTORE}
            exit;
        fi
    else
        echo ${LBLUE}"== Creating temp directory at ${backup_path} ..."${RESTORE}
        # Create directory and set default file permissions
        mkdir $backup_path & chmod +x $backup_path
    fi
}

function exportStagingDatabase {
    if [ "$skip_export" = true ] ; then
        return 1
    fi

    printf "\n"
    while true; do
        read -p ${LBLUE}"Do you also want to save this export to to your home directory? [y/n]: "${RESTORE} yn
        case $yn in
            [Yy]* ) save_export=true; break;;
            [Nn]* ) break;;
            * ) echo ${LRED}"Please answer yes or no."${RESTORE};;
        esac
    done

    printf "\n"
    read -p ${LBLUE}"Staging database user [${staging_user}]: "${RESTORE} staging_user_input
    staging_user="${staging_user_input:-$staging_user}"
    echo ${LBLUE}"Staging database password [****]: "${RESTORE};
    read -s staging_password
    printf "\n"

    echo ${LBLUE}"== Exporting staging database ..."${RESTORE}

    # Dump database from staging
    export MYSQL_PWD=$staging_password;
    mysqldump -u $staging_user -h $staging_host $db_name > $backup_path/$db_name.sql

    if [ "$?" -eq 0 ]
    then
        export_success=true
    else
        echo ${LRED}"Could not export ${db_name}, please check the database connection and credentials are correct"${RESTORE};

        return 1
    fi

    if [ "$save_export" = true ] ; then
        echo ${LGREEN}"Copying export ${db_name}.sql to your home directory"${RESTORE};
        cp $backup_path/$db_name.sql "/Users/${USER}/${db_name}_${today}.sql"
    fi
}

function importConterDatabase {
    if [ "$export_success" = false ] && [ "$skip_export" = false ] ; then
        return 1
    fi

    echo ${LBLUE}"== Importing database to localhost ..."${RESTORE}

    # Import database into localhost
    cat $backup_path/$sql_file_name.sql | docker exec -i $db_container /usr/bin/mysql -u $local_user --password=$local_password $db_name

    if [ "$?" -eq 0 ]
    then
        return 1
    else
        echo ${LRED}"Could not import ${backup_path}/${sql_file_name}.sql to ${db_name}, please check the container is running and the database credentials are correct"${RESTORE};
    fi
}

function cleanup {
    echo ${LBLUE}"== Cleaning up ..."${RESTORE}
    #git clean -f -d
}

buildAndRunContainers
createTmpStorage
exportStagingDatabase
importConterDatabase
cleanup
