package model

type UserT struct {
	Username string `json:"username" bson:"username"`
	Email    string `json:"email" bson:"email"`
	Verified bool   `json:"verified" bson:"Verified"`
	Block    string `json:"Block"`
	Room     string `json:"room" bson:"room"`
	Floor    string `json:"floor" bson:"floor"`
}

func CheckValidBlock(block string) bool {
	switch block {
	case "A_BLOCK":
		return true
	case "D1_BLOCK":
		return true
	case "D2_BLOCK":
		return true
	case "E_BLOCK":
		return true
	case "C_BLOCK":
		return true
	case "B_BLOCK":
		return true
	default:
		return false
	}
}
