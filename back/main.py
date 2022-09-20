from torchvision import transforms
import numpy as np
import torch

CLASSES = ('Eiffel Tower','China Wall', 'Mona Lisa')

def preprocess_array(arr):
    new_arr = preprocess_array(arr)
    # если размер массива 100000
    new_arr = np.reshape(new_arr, (100, 100))

    to_image = transforms.ToPILImage()
    to_downsize = transforms.Compose([transforms.Resize((28, 28)),
                                      transforms.ToTensor()])

    new_arr = to_downsize(to_image(torch.from_numpy(new_arr)))[None, :, :, :]

    return new_arr

def get_prediction(arr):
    nice_array = preprocess_array(arr)

    net = torch.load('models/net-3')
    logits = net(nice_array)

    return CLASSES[logits.detach().numpy().argmax(1)[0]]

if __name__ == '__main__':
    pass
