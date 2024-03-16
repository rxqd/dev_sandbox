require "readline"

class App
  class << self
    PROMPT = "$= ".freeze

    def run(&block)
      raise InvalidArgument, "Block is required" unless block_given?

      init_signals

      while (user_input = Readline.readline(PROMPT, true))
        remove_history_duplicates(user_input)

        if %w[q quit exit].include?(user_input)
          p "Bye!"
          break
        end

        p block.call(user_input)
      end
    end

    def init_signals
      stty_save = `stty -g`.chomp
      trap("INT") do
        system "stty", stty_save
        exit
      end
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
  end
end
