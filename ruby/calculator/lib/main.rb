require_relative "app"
require_relative "calculator"
require "readline"

def main
  App.run do |user_input|
    Calculator.new.calculate(user_input)
  end
end

main if __FILE__ == $PROGRAM_NAME
