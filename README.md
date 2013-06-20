# anyrun

Transparent command runner library &command runner tool.

This project is an experiment.


## Requirement

- node >= 0.11.x

You must use the `--harmony` flags when running node 0.11.x


## Installation

```
$ npm install anyrun
```

## Example

```javascript
var runner = anyrun();
runner.host('localhost');
runner.run('uname -u', function (err, stdout, stderr) {
  console.log('uname done');
}).run('echo "Hello world"', function (err, stdout, stderr) {
  console.log('echo done');
});
```

## API

### anyrun()

Return a new `AnyRun` instance.

### AnyRun#host(name)

- `name`: hostname

### AnyRun#run(cmd, cb)

- `cmd`: the command string
- `cb`: the callback `cb(err, stdout, stderr)`


## Test

```
    $ make test
```

## License

[MIT license](http://www.opensource.org/licenses/mit-license.php).

See the `LICENSE`.


## TODO


