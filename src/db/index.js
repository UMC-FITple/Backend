import { Sequelize } from 'sequelize';
import { config as dbConfig } from '../config/db.config.js';
import { Member } from './models/member.js';
import { Body_Info } from './models/body_info.js';

const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

Member.initiate(sequelize);
Body_Info.initiate(sequelize);

db.Member = Member;
db.Body_Info = Body_Info;

Member.associate(db);
Body_Info.associate(db);

export const init = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('데이터베이스 연결이 성공적으로 이루어졌습니다.');
    await db.sequelize.sync();
    console.log('데이터베이스 동기화가 완료되었습니다.');
  } catch (error) {
    console.error('데이터베이스 연결에 실패했습니다:', error);
  }
};

export default db;
