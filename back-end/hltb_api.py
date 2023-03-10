from howlongtobeatpy import HowLongToBeat
import asyncio

async def getresults(gameName):
    results_list = await HowLongToBeat().async_search(gameName)
    if results_list is not None and len(results_list) > 0:
        best_element = max(results_list, key=lambda element: element.similarity)
    return best_element

result = asyncio.run(getresults("Arma 3")) 

print(result.main_story)