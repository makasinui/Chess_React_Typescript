import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figures";
import blackLogo from '../../assets/black-king.png'
import whiteLogo from '../../assets/white-king.png'

export class King extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color,cell)
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
        this.name = FigureNames.KING;
    }

    canMove(target: Cell) :boolean {
        if(!super.canMove(target)) 
            return false;
        const directionY = this.cell.figure?.color === Colors.BLACK ? 1 : -1
        const directionX = this.cell.figure?.color === Colors.BLACK ? 1 : -1
        if((
             (target.y === this.cell.y + directionY || target.y === this.cell.y - directionY))
            && target.x === this.cell.x 
            && this.cell.board.getCell(target.x, target.y).isEmpty()) {
            return true
        }
        
        if(this.cell.isEmptyHorizontal(target)
            && (target.x + directionX === this.cell.x || target.x - directionX === this.cell.x)) {
            return true
        }

        if(this.cell.isEmptyDiagonal(target)
            && (target.x + directionX === this.cell.x || target.x - directionX === this.cell.x)) {
            return true
        }

        if(this.cell.y === 5) {
            return false
        }
        return false;
    }
}