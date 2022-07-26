import express from 'express';
import controller from '../controllers/tollTax';

const router = express.Router();

router.post('/enter', controller.enterToRingRoad);
router.post('/exit', controller.exitFromRingRoad);

export = router;
