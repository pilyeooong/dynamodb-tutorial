const AWS = require('aws-sdk');
const dotenv = require('dotenv');

dotenv.config();

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'dynamodb-tutorial';

const getCharacters = async () => {
  const params = {
    TableName: TABLE_NAME
  };
  const characters = await dynamoClient.scan(params).promise();
  console.log(characters);
  return characters;
}

const addOrUpdateCharacter = async (character) => {
  const params = {
    TableName: TABLE_NAME,
    Item: character
  }
  return await dynamoClient.put(params).promise();
}

const getCharacterById = async (id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id,
    },
  };
  return await dynamoClient.get(params).promise();
};

const deleteCharacterById = async (id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id,
    }
  };
  return await dynamoClient.delete(params).promise();
}

module.exports = {
  dynamoClient,
  getCharacters,
  getCharacterById,
  addOrUpdateCharacter,
  deleteCharacterById,
}
