##USER_CODE##

if __name__ == "__main__":
    import sys
    input = sys.stdin.read().split()
    n = int(input[0])
    nums = list(map(int, input[1:n+1]))
    result = threeSum(nums)
    print(str(result).replace(" ", ""))