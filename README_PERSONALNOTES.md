Stockopedia Angular Technical Task

Observations

Ledio Zefi



Hi People from Stockopedia,

Thank you for sending over the Angular Technical Task last week. 

I’ve finished all the requirements as per requested and in this document I have added a few observation in relation to some of the functions on what could have been done had there been more time but also what, using my own imagination, believe could have been a great addition as a quality of life improvement to the 
end-user.

The testing on my end was performed using Jest. 

Here are some of the notes taken during the test:

•	There have been a few validation checks that were omitted due to time constraints. 
For example:
Selling shares needed to validate that there was an existing security equivalent to it which also had an equal or higher amount of shares than were being sold. (This thought process did not factor in the possibility of shorting-type orders but only buy/sell of already owned shares, otherwise the logical process would have been slightly different)

This also applied in the eventuality of editing a buy order.
For example: 
You buy 50 shares of AAPL then you sell 50 shares of AAPL, afterwards you edit the buy order to 40 shares, now this causes the selling of 50 shares to be invalid. This scenario was accounted for but as I mentioned, due to the time constraints it was omitted but noted.

A similar observation was made in relation to deposits/withdrawals applying the same logic as the scenarios listed above.

•	The following changes weren’t part of the test but I took the liberty to add the following quality of life improvements:
- Shares and Value fields must be a positive value and higher than 0
- Security and Shares Fields are disabled when performing a Deposit/Withdrawal as those fields are not needed
- When placing a buy order the buy order cannot exceed the total cumulative cashflow in value. This limit applies to Withdrawals too. 

•	Here are some of the following changes I would have made if I could have just kept on developing it further and further:

- Function to view a pie-chart style which has a full breakdown of your entire portfolio including your total cash available.
- Live tracker of the securities you have bought so your portfolio keeps track of the current market value for any open positions
- Auto-fill the security field based on suggestions as you type the full name or potentially even the ticker (i.e. ‘Apple Inc’ when typing ‘AAPL’ or ‘General Motors’ when typing ‘General’)
- Connection to one/more broker/s to show live PnLs and potentially even allow you to place/close orders from it.  
- News tracker for your open positions to allow you to stay on top of all your stocks and not miss any important catalysts (these last 2 would drastically increase user retention)
- Add a price per share field
- Have a YTD PnL chart to view how your portfolio has been performing over-time or between 2 selected dates
- UI/UX Optimizations
- More
