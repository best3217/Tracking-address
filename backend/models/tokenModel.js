import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const Token = db.define('token',{
    address:{
        type: DataTypes.STRING
    },
    balance:{
        type: DataTypes.DOUBLE
    },
    comment:{
        type: DataTypes.STRING
    },
    note:{
        type: DataTypes.STRING
    }
},{
    freezeTableName: true
});
 
export default Token;