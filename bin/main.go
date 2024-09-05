package main

import (
	"log"
	"os"

	"github.com/dop251/goja"
	"github.com/dop251/goja_nodejs/require"
)

func main() {
    registry := new(require.Registry)
    vm := goja.New()

    registry.Enable(vm)

    raw, err := os.ReadFile("./index.js")

    if err != nil {
        log.Fatal(err)
    }

    _, err = vm.RunString(string(raw))

    if err != nil {
        log.Fatal(err)
    }

    var main func([]string) bool

    err = vm.ExportTo(vm.Get("main"), &main)

    if err != nil {
        log.Fatal(err)
    }

    output := main(os.Args[1:])

    if (output) {
        os.Exit(0)
    }

    os.Exit(1)
}
