import { Sequelize, DataTypes } from 'sequelize';

export class Member extends Sequelize.Model {
  static initiate(sequelize) {
    Member.init({
      uuid: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(150),
        allowNull: false,
        comment: '해쉬화 된 비밀번호 저장',
      },
      name: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING(5),
        allowNull: true,
      },
      one_line_info: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      img_url: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Member',
      tableName: 'member',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    this.hasOne(db.Body_Info, { foreignKey: 'uuid' });
  }
}
