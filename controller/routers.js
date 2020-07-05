const express = require('express');
const records = require('../models/records');

const router = express.Router();

router.post('/listRecords', async (req, res) => {
    let { startDate, endDate, minCount, maxCount } = req.body;
    try {
        if (startDate === undefined || 
            endDate === undefined || 
            minCount === undefined || 
            maxCount === undefined) {
            throw new Error('Chenck the entered parameters');
        }
        let result = await records.aggregate([{
                $match: {
                    $and: [
                        {
                            createAt: {
                                $gte: new Date(startDate),
                                $lte: new Date(endDate)
                            },
                        },
                        {
                            totalCount: {
                                $gt: minCount,
                                $lt: maxCount
                            }
                        }
                    ]
                }
            }
        ]).exec();
        res.status(200).json({
            code: 0,
            msg: 'Success',
            records: result
        });
    } catch (ex) {
        // There was an error querying the database
        res.status(500).json({ 
            code: 50,
            msg: ex.message
        });
    }
});

module.exports = router;