import requests
import re

url = "https://www.douban.com/doulist/3401345/"
head = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                  "Chrome/120.0.0.0 Safari/537.36"
}


resp = requests.get(url, headers=head)
resp.encoding = 'utf-8'

obj = re.compile(
    r'<div class="title">.*?/>(?P<title>.*?)</a>.*?'
    r'<div class="abstract">(?P<name>.*?)<br />', re.S)

result = obj.findall(resp.text)

for item in result:
    print(item[0].strip(), item[1].strip())