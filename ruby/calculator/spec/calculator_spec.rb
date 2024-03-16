require "calculator"

RSpec.describe "Calculator" do
  describe "#calculate" do
    it "expect to sum two digits" do
      expect(calculate("3+5")).to eq(8.0)
      expect(calculate("3 + 5")).to eq(8.0)
    end
  end
end
