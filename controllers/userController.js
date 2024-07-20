const User = require("../models/User");
const { userValidation } = require("../validation");

const getAllUsers = async (req, res) => {
  try {
    const { search } = req.query;

    let queryObject = {};

    // search
    if (search) {
      // name -> name field
      queryObject.name = { $regex: search, $options: "i" };
    }

    if (search) {
      queryObject = {
        // ensures that the query will match documents where the name or occupation fields contain the search term
        $or: [
          // $regex -> is used for partial matching
          // $options: 'i' -> case insensitivity to match upper and lower cases
          // name & occupation -> filed
          { name: { $regex: `^${search}`, $options: "i" } },
          { occupation: { $regex: `^${search}`, $options: "i" } },
        ],
      };
    }

    // thenable object, provide method chaining (shouldn't use await here)
    let result = User.find(queryObject);

    // skip() & limit() -> use for pagination
    // query string's type is String (remember to convert type)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);

    // documents that we will send back
    const users = await result;

    // count all documents
    const totalUsers = await User.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalUsers / limit);

    res.status(200).json({ users, totalUsers, numOfPages });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getUser = async (req, res) => {
  const { _id } = req.params;

  try {
    const user = await User.findOne({ _id });

    if (!user) {
      return res.status(404).json({ msg: `No user with id: ${_id}` });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    if (error.name === "CastError") {
      // Not Found
      return res.status(404).json({ msg: `No user with id: ${_id}` });
    } else {
      res.status(500).json({ error });
    }
  }
};

const createUser = async (req, res) => {
  // check every column's pattern is correct or not
  const { error } = userValidation(req.body);

  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  try {
    await User.create({ ...req.body });

    res.status(201).json({ msg: "Created successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateUser = async (req, res) => {
  const { error } = userValidation(req.body);

  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  const { _id } = req.params;

  try {
    const user = await User.findOneAndUpdate({ _id }, req.body, { new: true });

    if (!user) {
      // Not Found
      return res.status(404).json({ msg: `No user with id: ${_id}` });
    }

    res.status(200).json({ msg: "Updated successfully" });
  } catch (error) {
    if (error.name === "CastError") {
      // Not Found
      return res.status(404).json({ msg: `No user with id: ${_id}` });
    } else {
      res.status(500).json({ error });
    }
  }
};

const deleteUser = async (req, res) => {
  const { _id } = req.params;

  try {
    const user = await User.findOneAndDelete({ _id });

    if (!user) {
      // Not Found
      return res.status(404).json({ msg: `No user with id: ${_id}` });
    }

    res.status(200).json({ msg: "Deleted successfully" });
  } catch (error) {
    if (error.name === "CastError") {
      // Not Found
      return res.status(404).json({ msg: `No user with id: ${_id}` });
    } else {
      res.status(500).json({ error });
    }
  }
};

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser };
