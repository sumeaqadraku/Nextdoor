const { Ligjerata, Ligjeruesi } = require('../models');

exports.addLecturer = async (req, res) => {
    try {
        const { lecturerName, deparatament, email } = req.body;

        const newLecturer = await Ligjeruesi.create({
            lecturerName,
            deparatament,
            email
        });

        return res.status(201).json({
            message: 'Lecturer added successfully.',
        });
    } catch (error) {
        console.error('Error adding lecturer:', error);
        return res.status(500).json({ message: 'Server error while adding lecturer.', error: error.message });
    }
}

exports.AddLigjerata = async (req, res) => {
    try {
        const { lectureName, lecturerId } = req.body;

        const newLigjerata = await Ligjerata.create({
            lectureName,
            lecturerId
        });

        return res.status(201).json({
            message: 'Lecture added successfully.'
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server error while adding lecture.' });
    }
}

exports.getAllLecturers = async (req,res) => {
    try {
        const lecturers = await Ligjeruesi.findAll({
            attributes: ['id', 'lecturerName', 'deparatament', 'email']
        });

        return res.status(200).json(lecturers);
    } catch (error) {
        console.error('Error fetching lecturers:', error);
        return res.status(500).json({ message: 'Server error while fetching lecturers.' });
    }
}

exports.getLectutersAndCourses = async (req, res) => {
    try {
        const lectures = await Ligjeruesi.findAll({
            include: [
                {
                    model: Ligjerata,
                    as: 'ligjerata',
                    attributes: ['id', 'lectureName', 'lecturerId', ]
                }
            ]
        });

        const formattedData = lectures.flatMap((lecturer) =>
        lecturer.ligjerata.map((course) => ({
            id: lecturer.id,
            lecturerName: lecturer.lecturerName,
            deparatament: lecturer.deparatament,
            email: lecturer.email,
            ligjerataId: course.id,
            lecturerId: course.lecturerId,
            lectureName: course.lectureName,
        }))
    );

        return res.status(200).json(formattedData);
    } catch (error) {
        console.error('Error fetching lecturers and courses:', error);
        return res.status(500).json({ message: 'Server error while fetching lecturers and courses.', error: error.message });
    }
}

exports.getLecturerById = async (req, res) => {
    try {
        const { id } = req.params;

        const lecturer = await Ligjeruesi.findByPk(id, {
            attributes: ['id', 'lecturerName', 'deparatament', 'email']
        });

        if (!lecturer) {
            return res.status(404).json({ message: 'Lecturer not found.' });
        }

        return res.status(200).json(lecturer);
    } catch (error) {
        console.error('Error fetching lecturer:', error);
        return res.status(500).json({ message: 'Server error while fetching lecturer.' });
    }
}

exports.updateLecturer = async (req, res) => {
    try {
        const { id } = req.params;
        const { lecturerName, deparatament, email } = req.body;

        const lecturer = await Ligjeruesi.findByPk(id);

        if (!lecturer) {
            return res.status(404).json({ message: 'Lecturer not found.' });
        }

        lecturer.lecturerName = lecturerName || lecturer.lecturerName;
        lecturer.deparatament = deparatament || lecturer.deparatament;
        lecturer.email = email || lecturer.email;

        await lecturer.save();

        return res.status(200).json({ message: 'Lecturer updated successfully.'});
    } catch (error) {
        return res.status(500).json({ message: 'Server error while updating lecturer.' });
    }
}

exports.deleteLigjerata = async (req, res) => {
    try {
        const { id } = req.params;

        const ligjerata = await Ligjerata.findByPk(id);

        if (!ligjerata) {
            return res.status(404).json({ message: 'Lecture not found.' });
        }

        await ligjerata.destroy();

        return res.status(200).json({ message: 'Lecture deleted successfully.' });
    } catch (error) {
        console.error('Error deleting lecture:', error);
        return res.status(500).json({ message: 'Server error while deleting lecture.' });
    }
}