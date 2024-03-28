# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.

def rectangular_tower():
    height = int(input("Enter the height of the rectangular tower: "))
    width = int(input("Enter the width of the rectangular tower: "))

    if height == width or abs(height - width) > 5:
        print("Area of the rectangular tower:", height * width)
    else:
        print("Perimeter of the rectangular tower:", 2 * (height + width))


def triangular_tower():
    height = int(input("Enter the height of the triangular tower: "))
    width = int(input("Enter the width of the triangular tower: "))
    print("1. Print perimeter of the triangular")
    print("2. Print the triangular")

    choice = int(input("Enter your choice: "))
    if choice == 1:
        side = (height ** 2 + (width / 2) ** 2) ** 0.5
        perimeter = width + side + side
        print("Perimeter of the triangular tower:", perimeter)
    else:
        if width % 2 == 0 or width > 2 * height:
            print("Triangle cannot be printed.")
        else:
            blocks = (width - 2) // 2 #1
            width_of_block = 3
            if blocks == 0:
                rest = height - 2
                height_of_block = height - 2
            else:
                rest = (height - 2) % blocks #1
                height_of_block = (height - 2) // blocks #2
            middle_of_width = ((width - 1) // 2) #2
            print(" " * middle_of_width + "*")
            for i in range(1, rest + 1):
                print(" " * (middle_of_width - 1) + "*" * 3)
            for i in range(1, blocks + 1):
                for j in range(1, height_of_block + 1):
                    print(" " * (middle_of_width - i) + "*" * width_of_block)
                width_of_block += 2
            print("*" * width)

while True:
    print("\nMenu:")
    print("1. Rectangular Tower")
    print("2. Triangular Tower")
    print("3. Exit")

    choice = int(input("Enter your choice: "))

    if choice == 1:
        rectangular_tower()
    elif choice == 2:
        triangular_tower()
    elif choice == 3:
        break
    else:
        print("Invalid choice. Please try again.")

