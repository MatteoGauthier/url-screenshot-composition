# url-screenshot-composition

## Screenshot a website

Example with a screenshot of `facebook.com`

```http
https://url-screenshot-composition.now.sh/api/screenshot?url=facebook.com
```

#### Avaible parameter :

| Name      | Description                             | Required | Example      |
| --------- | --------------------------------------- | -------- | ------------ |
| `url`     | The url of the site to be screenshot    | ✔        | `url=yt.be`  |
| `quality` | Choose quality of the output            |          | `quality=75` |
| `json`    | JSON response instead of image (Buffer) |          | `json`       |

## Edit the screenshoted website

Example with a screenshot of `facebook.com`

```http
https://url-screenshot-composition.now.sh/api/screenshot-and-edit?newLayer=https://via.placeholder.com/150&url=yt.be
```

#### Avaible parameter :

| Name       | Description                                 | Required | Example          |
| ---------- | ------------------------------------------- | -------- | ---------------- |
| `url`      | The url of the site to be screenshot        | ✔        | `url=yt.be`      |
| `newLayer` | New layer content (url, text, image buffer) | ✔        | `newLayer=Hello` |
| `quality`  | Choose quality of the output                |          | `quality=75`     |
| `json`     | JSON response instead of image (Buffer)     |          | `json`           |

---

Feature like width and height or position will be added soon.

| Not implemented yet (Planned) | Description                  |
| ----------------------------- | ---------------------------- |
| _width_                       | _width of the screenshot_    |
| _height_                      | _height of the screenshot_   |
| _x_                           | _position x of the newLayer_ |
| _y_                           | _position y of the newLayer_ |
