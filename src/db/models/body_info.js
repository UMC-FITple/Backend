import { Sequelize, DataTypes } from 'sequelize';

export class Body_Info extends Sequelize.Model {
  static initiate(sequelize) {
    Body_Info.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        uuid: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
          references: {
            model: 'Member', // 참조하는 모델 이름
            key: 'uuid',
          },
        },
        height: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        weight: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        shoulder_width: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        chest_circumference: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        arm_length: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        waist_circumference: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        thigh_circumference: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        hip_circumference: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'Body_Info', // 모델 이름에 언더스코어 사용
        tableName: 'body_info', // 대문자 및 언더스코어 포함 테이블 이름
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    this.belongsTo(db.Member, { foreignKey: 'uuid' });
  }
}
