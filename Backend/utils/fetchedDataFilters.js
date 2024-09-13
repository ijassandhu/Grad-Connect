import jwt from "jsonwebtoken";
export const userFilter = (user) => {
  user["_id"] = jwt.sign({ _id: user["_id"] }, process.env.authSecret);
  delete user.password;
  delete user.__v;
  user.posts.forEach((post) => {
    post.id = jwt.sign({ _id: post }, process.env.viewSecret);
  });
  user.educationalInstitutions.forEach((educationalInstitution) => {
    educationalInstitution.id = jwt.sign(
      { _id: educationalInstitution.id },
      process.env.viewSecret,
    );
  });
  user.experience.forEach((experience) => {
    experience.companyId = jwt.sign(
      { _id: experience.companyId },
      process.env.viewSecret,
    );
  });
  return user;
};

export const eduInstitutionFilter = (eduInstitution) => {
  eduInstitution._id = jwt.sign(
    { _id: eduInstitution._id },
    process.env.authSecret,
  );
  delete eduInstitution.password;
  delete eduInstitution.__v;

  eduInstitution.posts.forEach((post) => {
    post.id = jwt.sign({ _id: post }, process.env.viewSecret);
  });
  eduInstitution.students.forEach((student) => {
    student = jwt.sign({ _id: student }, process.env.viewSecret);
  });
  eduInstitution.alumnis.forEach((alumni) => {
    alumni = jwt.sign({ _id: alumni }, process.env.viewSecret);
  });
  return eduInstitution;
};

export const postFilter = (post) => {
  delete post.__v;
  post._id = jwt.sign({ _id: post._id }, process.env.authSecret);
  post.comments.forEach((comment) => {
    comment.userId = jwt.sign({ _id: comment.userd }, process.env.viewSecret);
  });
  post.referenceId = jwt.sign(
    { _id: post.referenceId },
    process.env.viewSecret,
  );
  return post;
};
