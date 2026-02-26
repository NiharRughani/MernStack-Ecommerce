import { Address } from "../Models/Address.js";

export const addAddress = async (req, res) => {
  let { fullName, address, city, state, country, pincode, phoneNumber } =
    req.body;

  let userAddress = await Address.create({
    userId: req.user,
    fullName,
    address,
    city,
    state,
    country,
    pincode,
    phoneNumber,
  });
  res.json({
    message: "Address Added",
    userAddress,
    success: true,
  });
};

export const getAddress = async (req, res) => {
  let address = await Address.find({ userId: req.user._id }).sort({
    _id: -1,
  });

  // here find method returns the array of all the address and it is already sorted from latest to oldest so this will give the latest address

  if (!address)
    return res.json({
      message: "please add the address first",
    });

  res.json({
    message: "address",
    userAddress: address[0],
  });
};
