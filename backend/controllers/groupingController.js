import Group from "../models/group.js";
import User from "../models/user.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

// export const createGroup = async (req, res) => {

//     try {

//     } catch (error) {

//     }
// }

export const addMember = async (req, res) => {
  console.log(req.body);
  const { email, memberEmail } = req.body;
  try {
    if (email === memberEmail)
      return res.send({ message: "You can't add yourself in group" });

    const existingUser = await User.findOne({ email: memberEmail });
    if (existingUser == null)
      return res.send({ message: "Email doesn't exist." });
    const leaduser = await User.findOne({ email: email });
    if (existingUser == null)
      return res.send({ message: "Leader Email doesn't exist." });

    const groupCheck = await Group.findOne({ email: memberEmail });
    if (groupCheck) return res.send({ message: "Already has group." });

    const creatingAuthority = await Group.findOne({
      email: email,
      isGroupLead: false,
    });
    if (creatingAuthority)
      return res.send({
        message: "You can't create group, you are already in someone's group.",
      });

    const leadCheck = await Group.findOne({ email: email, isGroupLead: true });

    if (leadCheck) {
      const result = await Group.create({
        groupId: leadCheck.groupId,
        projectId: leadCheck.projectId,
        email: memberEmail,
        isGroupLead: false,
        status: "pending",
      });

      const token = jwt.sign(
        { email: memberEmail, id: existingUser._id },
        "test",
        { expiresIn: "1h" }
      );

      let url = `https://localhost:8080/home/grouping/invite/${token}`;

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "fypsystem.uet@gmail.com",
          pass: "peofivwdnsyxhcuf",
        },
      });

      const mailOptions = {
        from: "fypsystem.uet@gmail.com",
        to: memberEmail,
        subject: "Group Invitation Email",
        html: `Hi ${existingUser.firstName + " " + existingUser.lastName},<br>${
          leaduser.firstName + " " + leaduser.lastName
        } is inviting you in your group, click to the link below if you want to join my FYP Group <br> <a href="${url}">Click Here</a> <br><br>Regards,<br>${
          leaduser.firstName + " " + leaduser.lastName
        }`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          res.status(200).json({ response: "Invitation Sent Successfully" });
        }
      });
    } else {
      const result1 = await Group.create({
        groupId: 1,
        projectId: 1,
        email: email,
        isGroupLead: true,
        status: "confirm",
      });
      const result2 = await Group.create({
        groupId: 1,
        projectId: 1,
        email: memberEmail,
        isGroupLead: false,
        status: "pending",
      });

      const token = jwt.sign(
        { email: memberEmail, id: existingUser._id },
        "test",
        { expiresIn: "1h" }
      );

      let url = `https://localhost:3000/home/grouping/invite/${token}`;

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "fypsystem.uet@gmail.com",
          pass: "peofivwdnsyxhcuf",
        },
      });

      const mailOptions = {
        from: "fypsystem.uet@gmail.com",
        to: memberEmail,
        subject: "Group Invitation Email",
        html: `Hi ${
          existingUser.firstName + " " + existingUser.lastName
        },<br>I am <b>${
          leaduser.firstName + " " + leaduser.lastName
        }<b> and I am inviting you in to my FYP group, click to the link below if you are interested <br> <a href="${url}">Click Here</a> <br><br>Regards,<br>${
          leaduser.firstName + " " + leaduser.lastName
        }`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          res.status(200).json({ response: "Invitation Sent Successfully" });
        }
      });
    }

    // res
    //   .status(200)
    //   .json("Registeration Successfull" );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

export const getMembers = async (req, res) => {
  const { email } = req.params;
  // console.log(email)
  try {
    const leadCheck = await Group.findOne({ email: email, isGroupLead: true });
    // console.log(leadCheck)

    if (leadCheck) {
      console.log(leadCheck);
      const listMembers = await Group.find({ groupId: leadCheck.groupId });

      let users = [];
      for (let index = 0; index < listMembers.length; index++) {
        const element = listMembers[index];

        const user = await User.findOne({ email: element.email });
        users.push({
          email: element?.email,
          name: user?.firstName + " " + user?.lastName,
          rollNo: user?.userIdentity,
          status: element.status,
          memberType: element?.isGroupLead ? "Group Lead" : "Group Member",
        });
      }

      console.log(users);

      res.status(200).json({ result: users });
    } else {
      res.status(200).json({ result: [] });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something Went Wrong" });
  }
};
