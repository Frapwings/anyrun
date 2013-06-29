module.exports = {
  tasks: {
    task1: {
      description: 'This is the task1',
      action: function (anyrun, args, done) {
        anyrun.run('uptime', function (err, stdout, stderr) {
          console.log(stdout, stderr);
          done();
        });
      }
    },
    task2:{
      description: 'This is the task2',
      action: function (anyrun, args, done) {
        anyrun.run("echo 'hello'", function (err, stdout, stderr) {
          console.log(stdout, stderr);
          done();
        });
      }
    }
  }
};
