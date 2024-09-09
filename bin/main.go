package main

import (
	"log"
	"os"

	"github.com/dop251/goja"
	"github.com/dop251/goja_nodejs/require"
)

func main() {
    const SCRIPT = `
    const module = require('./index.js');
    function main(args) {
        return module.main(args);
    }
    `

    vm := goja.New()

    new(require.Registry).Enable(vm)
    vm.RunProgram(goja.MustCompile("index.js", SCRIPT, true))

    var main func([]string) bool

    err := vm.ExportTo(vm.Get("main"), &main)

    if err != nil {
        log.Fatal(err)
    }

    output := main(os.Args[1:])

    if (output) {
        os.Exit(0)
    }

    os.Exit(1)
}
