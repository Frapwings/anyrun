# anyrun

Transparent command execution library & command execution tool.


## Requirement

- node >= 0.10.x



## Installation

```
$ npm install anyrun
```



## Example

```javascript
// local
anyrun()
  .run('uname -s', function (err, stdout, stderr) {
    if (err) {
      console.error('uname error: code = %d, signal = %s', err.code, err.signal);
      return;
    }
    console.log('uname done: ', stdout);
  })
  .run('echo "Hello world"', function (err, stdout, stderr) {
    console.log('echo done');
  });

// remote
anyrun()
  .ssh('host', 'example.com')
  .ssh('port', 2222)
  .run('uname -u', function (err, stdout, stderr) {
    console.log('uname done');
  })
  .run('echo "Hello world"', function (err, stdout, stderr) {
    console.log('echo done');
  })
```



## API

### anyrun()

Initialize a new `AnyRun` instance.


### AnyRun#AnyRun()

Initialize a new `AnyRun` instance.


### AnyRun#ssh(key, value)

Set ssh options.

- `key`: the option key
- `value`: the option value


### AnyRun#run(cmd, cb)

Run command.

- `cmd`: the command
- `opts`: the options
- `cb`: the `cb(err, stdout, stderr)` callback


### AnyRun#done()

Done ssh session.



## Test

You must be prepared following before running the test.

- setup [Virtualbox](https://www.virtualbox.org)
- setup [Vagrant](http://www.vagrantup.com)
- start Vagrant VM
- setting sshd config (add `__HOGE__` to `AcceptEnv`) on server, and restart
- copy the private key genereted by Vagrant to `test/fixtures/id_rsa.vagrant`

When you're ready, run the following command:

```
    $ make test
```

## License

[MIT license](http://www.opensource.org/licenses/mit-license.php).

See the `LICENSE`.

