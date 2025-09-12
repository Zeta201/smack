// smackapi/main.go
package main

import (
	"fmt"
	"net/http"
	"os"
)

func handler(w http.ResponseWriter, r *http.Request) {
    version := os.Getenv("VERSION")
    if version == "" {
        version = "v1"
    }
    fmt.Fprintf(w, "Hello from Smack API! Version: %s\n", version)
}

func main() {
    http.HandleFunc("/", handler)
    port := "8080"
    fmt.Printf("Listening on port %s\n", port)
    http.ListenAndServe(":" + port, nil)
}
