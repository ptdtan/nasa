version 1.0

task hello {
  input {
    File example
  }

  command {
   xxhsum ~{example}
  }
  output {
    File response = stdout()
  }
  runtime {
   docker: 'docker.io/ptdtan/xxhash:latest'
  }
}

workflow test {
        input {
                String example_file
        }
  call hello {input: example=example_file}
}
