FROM alpine:3.12.1
WORKDIR /static-data-provider/
ADD "https://www.dropbox.com/sh/wb7wit4rtiyaqto/AADoJ3zkDF_dS0mv1fGUh7tta?dl=1" media.zip
RUN mkdir media/ && unzip media.zip -d media/ && chmod -x -R media/ && rm media.zip
CMD cp -rf /static-data-provider/media/* /mnt/media/ && echo "Media files updated in: /mnt/media/"