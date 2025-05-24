def threeSum(nums):
    nums.sort()
    result = []
    n = len(nums)
    
    for i in range(n - 2):
        if i > 0 and nums[i] == nums[i-1]:
            continue  # Skip duplicates
        
        left = i + 1
        right = n - 1
        
        while left < right:
            total = nums[i] + nums[left] + nums[right]
            if total < 0:
                left += 1
            elif total > 0:
                right -= 1
            else:
                result.append([nums[i], nums[left], nums[right]])
                # Skip duplicates for left and right
                while left < right and nums[left] == nums[left+1]:
                    left += 1
                while left < right and nums[right] == nums[right-1]:
                    right -= 1
                left += 1
                right -= 1
    return result

# Read input and run tests (for local testing)
if __name__ == "__main__":
    import sys
    input = sys.stdin.read().split()
    n = int(input[0])
    nums = list(map(int, input[1:n+1]))
    result = threeSum(nums)
    print(str(result).replace(" ", ""))