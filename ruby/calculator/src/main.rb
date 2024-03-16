require_relative "calculator"
require "readline"

stty_save = `stty -g`.chomp
trap("INT") do
  system "stty", stty_save
  exit
end

def remove_history_duplicates(buf)
  Readline::HISTORY.pop if /^\s*$/ =~ buf
  if Readline::HISTORY[Readline::HISTORY.length - 2] == buf
    Readline::HISTORY.pop
  end
# rubocop:disable Lint/SuppressedException
rescue IndexError
end
# rubocop:enable Lint/SuppressedException

PROMPT = "$= ".freeze

def main
  while (buf = Readline.readline(PROMPT, true))
    remove_history_duplicates(buf)

    if %w[q quit exit].include?(buf)
      p "Bye!"
      break
    end

    p Calculator.new.calculate(buf)
  end
end

main if __FILE__ == $PROGRAM_NAME
