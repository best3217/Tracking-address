import Token from "../models/tokenModel.js";
import { NBXClient } from "nbxplorer-client" 

export const getAllToken = async (req, res) => {
    try {
        const token = await Token.findAll();
        res.json(token);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const createToken = async (req, res) => {
    // trankingAddress(req.body.address);
    try {
        await Token.create(req.body);
        res.json({
            "message": "Address Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

// const trankingAddress = async (address) => {
//     const cli = new NBXClient({
//         uri: 'http://89.47.166.94:24444',
//         cryptoCode: 'ltc',
//       });
//     const healthCheckResponse = await cli.healthCheck();
// }
 
export const updateToken = async (req, res) => {
    try {
        await Token.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Address Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const deleteToken = async (req, res) => {
    try {
        await Token.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Address Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}