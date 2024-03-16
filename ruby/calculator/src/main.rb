require "./calculator"
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
rescue IndexError
  print "Readline Error"
end

while (buf = Readline.readline("> ", true))
  remove_history_duplicates(buf)

  result = Calculator.new.calculate(buf)

  print("= #{result}")
end
