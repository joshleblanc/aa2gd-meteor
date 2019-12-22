import AWS from 'aws-sdk';

const s3 = new AWS.S3({
    endpoint: "sfo2.digitaloceanspaces.com",
    accessKeyId: Meteor.settings.AWS_ACCESS_KEY,
    secretAccessKey: Meteor.settings.AWS_SECRET_ACCESS_KEY
});

export const uploadImage = (file, filename) => {
    const params = {
        Bucket: 'famtime',
        Key: filename,
        Body: file,
        ContentType: 'image/png',
        ACL:'public-read'
    };
    return s3.upload(params).promise();
};

export const cdnUrl = (key) => {
    return `https://famtime.sfo2.cdn.digitaloceanspaces.com/${key}`;
};