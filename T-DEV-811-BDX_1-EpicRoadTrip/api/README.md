# Api

To start your Phoenix server:

## Local
  * Run `mix setup` to install and setup dependencies
  * Start Phoenix endpoint with `mix phx.server` or inside IEx with `iex -S mix phx.server`
  
## Docker
  * Run `docker compose build`
  * Run `docker compose up`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.


# Utils

## JSON simplifier

To simplify data's json file there is `simplify_json` to create the simpler file to use

To use it open the file and update var `input_path` and `output_path`, then run `mix simplify_json`
