module.exports = {
  tasks: {
    task1: {
      description: 'This is the task1',
      action: function (anyrun, done) {
        anyrun.run('uptime', function (err, stdout, stderr) {
          console.log(data);
          done();
        });
      }
    },
    task2:{
      description: 'This is the task2',
      action: function (anyrun, done) {
        anyrun.run("echo 'hello'", function (err, stdout, stderr) {
          console.log(data);
          done();
        });
      }
    }
  }
}
