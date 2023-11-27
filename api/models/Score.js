
const mongoose = require('mongoose');

const MonthValuesSchema = new mongoose.Schema({
    jan: { type: Number, default: 0.0 },
    feb: { type: Number, default: 0.0 },
    mar: { type: Number, default: 0.0 },
    apr: { type: Number, default: 0.0 },
    may: { type: Number, default: 0.0 },
    june: { type: Number, default: 0.0 },
    july: { type: Number, default: 0.0 },
    aug: { type: Number, default: 0.0 },
    sept: { type: Number, default: 0.0 },
    oct: { type: Number, default: 0.0 },
    nov: { type: Number, default: 0.0 },
    dec: { type: Number, default: 0.0 },
});

const YearlyMonthValuesSchema = new mongoose.Schema({
    year: Number,
    monthValues: MonthValuesSchema,
});

const SubzoneSchema = new mongoose.Schema({
    name: String,
    modified_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    yearlyMonthValues: [YearlyMonthValuesSchema],
    remarks: String,
});

const ZoneSchema = new mongoose.Schema({
    name: String,
    subzones: [SubzoneSchema],
});

const DepartmentSchema = new mongoose.Schema({
    name: String,
    zones: [ZoneSchema],
});

const ScoreSchema = new mongoose.Schema({
    department: DepartmentSchema,
});

const ScoreModel = mongoose.model('Score', ScoreSchema);

module.exports = ScoreModel;
