const { getTimetable, createTimetable, modifyTimetable, deleteTimeTable, getAllTimetables } = require('../controllers');
const { modifyScheduleDay } = require('../controllers/timetable.controller');
const { authM } = require('../middleware');

const router = require('express').Router();

router
    .get("/tt/:ttId", getTimetable)
    .get("/timetables", authM, getAllTimetables)
    .post("/tt", authM, createTimetable)
    .put("/tt/:ttId", modifyTimetable)
    .put("/tt/updateSchedule/:ttId", modifyScheduleDay)
    .delete("/tt/:ttId", deleteTimeTable);
    
module.exports = router;